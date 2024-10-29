/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dlqox75XEex
 */

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";

export default function Portfoliocard() {
  return (
    <div className="flex flex-col space-x-0 lg:flex-row lg:space-x-8  bg-black">
      <Card className="w-full lg:w-1/2">
        <Image
          alt="Blog post cover"
          className="w-full h-48 object-cover"
          height="200"
          src="/placeholder.svg"
          style={{
            aspectRatio: "600/200",
            objectFit: "cover",
          }}
          width="600"
        />
        <CardContent>
          <Badge className="mb-4" variant="secondary">
            BLOG
          </Badge>
          <h2 className="text-2xl font-bold mb-4">
            Boost your conversion rate
          </h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
          <div className="flex items-center">
            <Avatar
              alt="Achim Rolle"
              className="w-8 h-8 rounded-full mr-3"
              src="/placeholder.svg?height=32&width=32"
            />
            <div>
              <p className="font-semibold">Achim Rolle</p>
              <p className="text-sm text-gray-500">Feb 08, 2021 · 6min read</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full lg:w-1/2">
        <Image
          alt="Blog post cover"
          className="w-full h-48 object-cover"
          height="200"
          src="/placeholder.svg"
          style={{
            aspectRatio: "600/200",
            objectFit: "cover",
          }}
          width="600"
        />
        <CardContent>
          <Badge className="mb-4" variant="secondary">
            BLOG
          </Badge>
          <h2 className="text-2xl font-bold mb-4">
            Boost your conversion rate
          </h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
          <div className="flex items-center">
            <Avatar
              alt="Achim Rolle"
              className="w-8 h-8 rounded-full mr-3"
              src="/placeholder.svg?height=32&width=32"
            />
            <div>
              <p className="font-semibold">Achim Rolle</p>
              <p className="text-sm text-gray-500">Feb 08, 2021 · 6min read</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
