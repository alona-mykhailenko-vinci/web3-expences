// Generated Pothos types for Prisma
// This is a placeholder file until proper generation is set up

export type PrismaTypes = {
  User: {
    Name: "User";
    Shape: {
      id: number;
      name: string;
      email: string;
      bankAccount: string | null;
    };
    Include: any;
    Select: any;
    OrderBy: any;
    Where: any;
    Create: any;
    Update: any;
    RelationName: "paidExpenses" | "transfersOut" | "transfersIn" | "participatedExpenses";
    ListRelations: "paidExpenses" | "transfersOut" | "transfersIn" | "participatedExpenses";
    Relations: {
      paidExpenses: {
        Shape: any[];
        Name: "Expense";
      };
      transfersOut: {
        Shape: any[];
        Name: "Transfer";
      };
      transfersIn: {
        Shape: any[];
        Name: "Transfer";
      };
      participatedExpenses: {
        Shape: any[];
        Name: "Expense";
      };
    };
  };
  Expense: {
    Name: "Expense";
    Shape: {
      id: number;
      description: string;
      amount: number;
      date: Date;
      payerId: number;
    };
    Include: any;
    Select: any;
    OrderBy: any;
    Where: any;
    Create: any;
    Update: any;
    RelationName: "payer" | "participants";
    ListRelations: "participants";
    Relations: {
      payer: {
        Shape: any;
        Name: "User";
      };
      participants: {
        Shape: any[];
        Name: "User";
      };
    };
  };
  Transfer: {
    Name: "Transfer";
    Shape: {
      id: number;
      description: string;
      amount: number;
      date: Date;
      sourceUserId: number;
      targetUserId: number;
    };
    Include: any;
    Select: any;
    OrderBy: any;
    Where: any;
    Create: any;
    Update: any;
    RelationName: "sourceUser" | "targetUser";
    ListRelations: never;
    Relations: {
      sourceUser: {
        Shape: any;
        Name: "User";
      };
      targetUser: {
        Shape: any;
        Name: "User";
      };
    };
  };
};

export default PrismaTypes;