import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const cart = await db.collection("carts").findOne({
      userId: new ObjectId(session.user.id),
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    // Populate product details
    const populatedItems = await Promise.all(
      cart.items.map(async (item: any) => {
        const product = await db
          .collection("products")
          .findOne({ _id: new ObjectId(item.productId) });
        return {
          ...item,
          product,
        };
      })
    );

    return NextResponse.json({ items: populatedItems });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity, size } = body;

    const { db } = await connectToDatabase();

    // Verify product exists and is in stock
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Update or create cart
    const cart = await db.collection("carts").findOneAndUpdate(
      { userId: new ObjectId(session.user.id) },
      {
        $push: {
          items: {
            productId: new ObjectId(productId),
            quantity,
            size,
            addedAt: new Date(),
          },
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return NextResponse.json(cart.value);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity } = body;

    const { db } = await connectToDatabase();

    const cart = await db.collection("carts").findOneAndUpdate(
      {
        userId: new ObjectId(session.user.id),
        "items.productId": new ObjectId(productId),
      },
      {
        $set: {
          "items.$.quantity": quantity,
          "items.$.updatedAt": new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!cart.value) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(cart.value);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const cart = await db.collection("carts").findOneAndUpdate(
      { userId: new ObjectId(session.user.id) },
      {
        $pull: {
          items: { productId: new ObjectId(productId) },
        },
      },
      { returnDocument: "after" }
    );

    return NextResponse.json(cart.value);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove cart item" },
      { status: 500 }
    );
  }
}
