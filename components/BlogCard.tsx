/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G6V2G4juBGX
 */
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogCard() {
  return (
    <main className="bg-black flex justify-center py-12 px-4 md:px-8 gap-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Joke Tax Chronicles
          </CardTitle>
          <p className="text-black">Posted on August 24, 2023</p>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-sm text-black">
            Once upon a time, in a far-off land, there was a very lazy king who
            spent all day lounging on his throne...
          </p>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Button className="text-black" variant="link">
            Read more
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            The Jester&apos;s Triumph
          </CardTitle>
          <p className="text-black">Posted on September 1, 2023</p>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-sm text-black">
            The Jokester, a court jester, refused to let the king&apos;s
            foolishness get him down. He started sneaking into the castle...
          </p>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Button className="text-black" variant="link">
            Read more
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
