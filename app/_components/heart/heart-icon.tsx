import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";

const Heart = () => {
  return (
    <Button size="icon" className="rounded-full bg-[#3D3D3C]">
      <HeartIcon size={24} className="fill-white" />
    </Button>
  );
};

export default Heart;
