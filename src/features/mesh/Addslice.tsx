import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  meshSelector,
  generateRandom,
  addColor,
} from "@/features/mesh/meshSlice";
import shortener from "@/hooks/Meshparametershortener";
import { Dices, BadgePlus } from "lucide-react";
import Header from "@/components/redux/Header";

const Addslice = () => {
  const { color } = useSelector(meshSelector);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addColor({ newColor: color }));
    dispatch(generateRandom());
  };

  return (
    <Card className="w-full p-2 flex justify-center items-center flex-col relative">
      <Card className="w-full bg-transparent border-none">
        <Header className="grid-cols-7" />
        <Card className="w-full border-none p-2 [&>*]:m-2 [&>*]:border-transparent [&>div]:text-center [&>p]:w-[80px] [&>*]:uppercase grid grid-cols-7 justify-around items-center">
          <Card>{shortener(color.size)}</Card>
          <Card>{shortener(color.shape)}</Card>
          <Card>{color.positionX}%</Card>
          <Card>{color.positionY}%</Card>
          <p className="col-span-2">{color.color1}</p>
          <Card>{color.endingPoint}%</Card>
        </Card>
      </Card>

      <Card className="w-full border-none bg-transparent gap-x-2 flex justify-between items-center relative">
        <Button
          onClick={() => dispatch(generateRandom())}
          className="w-4/5 font-bold text-xl"
        >
          <Dices className="mx-2" />
          Random
        </Button>
        <Button onClick={handleAdd} className="w-2/5 font-bold text-xl">
          <BadgePlus className="mx-2" />
          Add
        </Button>
      </Card>
    </Card>
  );
};

export default Addslice;
