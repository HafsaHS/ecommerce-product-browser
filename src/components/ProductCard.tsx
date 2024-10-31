import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductCard() {
  return (
    <div className="flex flex-col">
      <Card className="w-[300px]">
        <CardHeader className="">
          <img src="https://via.placeholder.com/150" alt="Product Image" />
          <CardTitle>Handbag</CardTitle>
          <CardDescription>The handbag is very trendy</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-lg">Product Name</span>
          <div>Product details</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
