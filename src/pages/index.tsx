import BaseLayout from "../components/BaseLayout";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { useSession, signIn, signOut } from "next-auth/react";
import { Pagination } from "@mantine/core";
import { CommonList } from "../models/CommonList.model";
import { ProductListItem } from "../models/ProductListItem.model";

const HomePage = () => {
  const { data: user } = useSession();
  const { isLoading, data: products } = useQuery(["products"], async () => {
    const { data } = await api.get("items/products", {
      params: {
        limit: 6,
        page: 1,
        fields: [
          "id",
          "title",
          "price",
          "cover_image",
          "handle",
          "comparable_price",
          "short_description",
        ],
      },
    });
    return data as CommonList<ProductListItem>;
  });

  return (
    <BaseLayout>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="grid max-w-6xl gap-8 px-4 mx-auto lg:p-0 lg:grid-cols-3 md:grid-cols-2">
        {products?.data.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.short_description}
            price={product.price}
            imageId={product.cover_image}
          />
        ))}
      </div>
      <button onClick={() => signIn()}>Sign in</button>
      <div className={"flex justify-center my-10"}>
        <Pagination total={20} boundaries={1} initialPage={1} />
      </div>
    </BaseLayout>
  );
};

export default HomePage;
