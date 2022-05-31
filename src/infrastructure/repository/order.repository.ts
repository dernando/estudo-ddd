import Order from "../../domain/entity/order";
import OrderItemModel from "../repository/db/sequelize/model/order-item.model";
import OrderModel from "../repository/db/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import CustomerModel from "./db/sequelize/model/customer.model";
import ProductModel from "./db/sequelize/model/product.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {

        try {
            await OrderModel.update(
                {
                    id: entity.id,
                    customer_id: entity.customerId,
                    total: entity.total(),
                    items: entity.items.map((item) => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            product_id: item.productId,
                            quantity: item.quantity,
                        })
                    ),
                },
                {
                    where: {
                        id: entity.id
                    }
                }
            );
        } catch (error) {
            throw new Error("Order not found");
          }
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
            where: {
              id: id,
            },
            include: [{
                model: CustomerModel
            },
            {
                model: OrderItemModel,
                include: [ProductModel]
            }],
            rejectOnEmpty: true,
          });
        } catch (error) {
          throw new Error("Order not found");
        }

        const customer = new Customer(orderModel.customer.id, orderModel.customer.name);
        const address = new Address(orderModel.customer.street, orderModel.customer.number, orderModel.customer.zipcode, orderModel.customer.city);
        customer.changeAddress(address);
    
        const ordemItems = orderModel.items.map( item => {

            return new OrderItem(
                item.id,
                item.product.name,
                item.product.price,
                item.product.id,
                item.quantity
            );
        });
    
        const order = new Order(id, orderModel.customer_id, ordemItems);

        return order;
    }
    
    async findAll(): Promise<Order[]> {
        let orderModels;
        try {
            orderModels = await OrderModel.findAll({
                include: [
                {
                    model: OrderItemModel,
                    include: [ProductModel]
                }]
            });
        } catch(error) {
            throw new Error("No orders found");
        }

        const orders = orderModels.map(orderModel => {
            const items = orderModel.items.map(item => {
                const product = new Product(item.product.id, item.product.name, item.product.price);
                return new OrderItem(item.id, product.name, product.price, product.id, item.quantity);
            });
            return new Order(orderModel.id, orderModel.customer_id, items);
        });


        return orders;
    }

}