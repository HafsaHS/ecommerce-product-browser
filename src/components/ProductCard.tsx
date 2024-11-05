import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
}

export function ProductCard({
  id,
  title,
  price,
  description,
  images,
  category,
}: ProductCardProps) {
  return (
    <Link to={`/product/${id}`}>
      <Card className="w-[300px] my-1">
        <CardHeader>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <CardTitle className="h-16 py-2 leading-6">{title}</CardTitle>
          <CardDescription className="pt-2 line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-xl font-medium">${price}</span>
          <div>
            <Badge className="uppercase"> {category}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
