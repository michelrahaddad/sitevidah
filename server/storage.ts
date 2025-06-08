import { customers, subscriptions, digitalCards, plans, type Customer, type InsertCustomer, type Subscription, type InsertSubscription, type DigitalCard, type InsertDigitalCard, type Plan, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  getCustomerByCpf(cpf: string): Promise<Customer | undefined>;
  
  getAllPlans(): Promise<Plan[]>;
  getPlanById(id: number): Promise<Plan | undefined>;
  
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptionById(id: number): Promise<Subscription | undefined>;
  updateSubscriptionStatus(id: number, status: string): Promise<Subscription | undefined>;
  
  createDigitalCard(card: InsertDigitalCard): Promise<DigitalCard>;
  getDigitalCardBySubscription(subscriptionId: number): Promise<DigitalCard | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private customers: Map<number, Customer>;
  private subscriptions: Map<number, Subscription>;
  private digitalCards: Map<number, DigitalCard>;
  private plans: Map<number, Plan>;
  private currentUserId: number;
  private currentCustomerId: number;
  private currentSubscriptionId: number;
  private currentCardId: number;
  private currentPlanId: number;

  constructor() {
    this.users = new Map();
    this.customers = new Map();
    this.subscriptions = new Map();
    this.digitalCards = new Map();
    this.plans = new Map();
    this.currentUserId = 1;
    this.currentCustomerId = 1;
    this.currentSubscriptionId = 1;
    this.currentCardId = 1;
    this.currentPlanId = 1;
    
    this.initializePlans();
  }

  private initializePlans() {
    const defaultPlans: Plan[] = [
      {
        id: 1,
        name: "Individual",
        type: "individual",
        annualPrice: "298.80",
        monthlyPrice: "24.90",
        adhesionFee: "30.00",
        maxDependents: 0,
        isActive: true,
      },
      {
        id: 2,
        name: "Familiar",
        type: "familiar", 
        annualPrice: "418.80",
        monthlyPrice: "34.90",
        adhesionFee: "30.00",
        maxDependents: 4,
        isActive: true,
      },
      {
        id: 3,
        name: "Empresarial",
        type: "empresarial",
        annualPrice: "358.80",
        monthlyPrice: "29.90",
        adhesionFee: "30.00",
        maxDependents: 0,
        isActive: true,
      }
    ];

    defaultPlans.forEach(plan => {
      this.plans.set(plan.id, plan);
      if (plan.id >= this.currentPlanId) {
        this.currentPlanId = plan.id + 1;
      }
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const customer: Customer = { 
      ...insertCustomer, 
      id, 
      createdAt: new Date() 
    };
    this.customers.set(id, customer);
    return customer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.email === email,
    );
  }

  async getCustomerByCpf(cpf: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.cpf === cpf,
    );
  }

  async getAllPlans(): Promise<Plan[]> {
    return Array.from(this.plans.values()).filter(plan => plan.isActive);
  }

  async getPlanById(id: number): Promise<Plan | undefined> {
    return this.plans.get(id);
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const subscription: Subscription = {
      id,
      customerId: insertSubscription.customerId,
      planId: insertSubscription.planId,
      paymentMethod: insertSubscription.paymentMethod,
      paymentStatus: 'pending',
      totalAmount: insertSubscription.totalAmount,
      installments: insertSubscription.installments || 1,
      createdAt: new Date(),
      expiresAt: insertSubscription.expiresAt,
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getSubscriptionById(id: number): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async updateSubscriptionStatus(id: number, status: string): Promise<Subscription | undefined> {
    const subscription = this.subscriptions.get(id);
    if (subscription) {
      subscription.paymentStatus = status;
      this.subscriptions.set(id, subscription);
    }
    return subscription;
  }

  async createDigitalCard(insertCard: InsertDigitalCard): Promise<DigitalCard> {
    const id = this.currentCardId++;
    const card: DigitalCard = {
      ...insertCard,
      id,
      isActive: true,
      createdAt: new Date(),
    };
    this.digitalCards.set(id, card);
    return card;
  }

  async getDigitalCardBySubscription(subscriptionId: number): Promise<DigitalCard | undefined> {
    return Array.from(this.digitalCards.values()).find(
      (card) => card.subscriptionId === subscriptionId,
    );
  }
}

export const storage = new MemStorage();
