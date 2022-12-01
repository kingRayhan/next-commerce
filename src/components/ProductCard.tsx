import { Card, Group, Image, Text, Badge, Button } from "@mantine/core";
import React from "react";

interface Props {
  title: string;
  description: string;
  price: number;
  imageId: string;
  previousPrice?: number;
  isOnSale?: boolean;
}

const ProductCard: React.FC<Props> = ({
  title,
  description,
  price,
  imageId,
  previousPrice,
  isOnSale,
}) => {
  const imageSrc = `http://104.251.211.125:8055/assets/${imageId}?width=546`;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imageSrc} height={160} alt={title} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        {isOnSale && (
          <Badge variant="light" color="red">
            Sale
          </Badge>
        )}
      </Group>

      <Text size="sm" color="dimmed">
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Add to card -{" "}
        {previousPrice && (
          <span className="line-through">${previousPrice}</span>
        )}{" "}
        ${price}
      </Button>
    </Card>
  );
};

export default ProductCard;
