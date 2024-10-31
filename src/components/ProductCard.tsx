import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
}

export function ProductCard({
  title,
  price,
  description,
  images,
  category,
}: ProductCardProps) {
  return (
    <div>
      <Card className="w-[300px]">
        <CardHeader className="">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <CardTitle>{title}</CardTitle>
          <CardDescription className="overflow-hidden">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-lg">${price}</span>
          <div>Category: {category}</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
