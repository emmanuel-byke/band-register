import { useState } from "react";
import { SimpleCard } from "../reusable/Cards";
import { TextDesc } from "../reusable/Text";
import { useNavigate } from "react-router-dom";



export const NewCommer = () => {
    const [value, setValue] = useState(0);
    const maxValue = 2;
    const navigate = useNavigate();

    if (value > maxValue) {
        navigate('/');
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {
            value === 0 ? (
              <FirstRemark setValue={setValue} value={value} maxValue={maxValue} />
            ) : value === 1 ? (
              <SecondRemark setValue={setValue} value={value} maxValue={maxValue} />
            ) : (
              <ThirdRemark setValue={setValue} value={value} maxValue={maxValue} />
            )
        }
    </div>
  );
};

const Button = ({ text, action }) => {
  return (
    <button
      className="mt-4 px-6 py-2 font-poppins text-gray-500 rounded-lg shadow-lg border border-blue-600
        hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
      onClick={action}
    >
      {text}
    </button>
  );
};

const CombinedButtons = ({ setValue }) => {
  return (
    <div className="flex space-x-4">
      <Button text="Prev" action={() => setValue((prev) => Math.max(prev - 1, 0))} />
      <Button text="Next" action={() => setValue((prev) => prev + 1)} />
    </div>
  );
};

const ButtonChooser = ({ setValue, value, maxValue }) => {
  return (
    <div className="flex space-x-4">
      {
        value <= 0 ? (
          <Button text="Next" action={() => setValue((prev) => prev + 1)} />
        ) : value > 0 && value < maxValue ? (
          <CombinedButtons setValue={setValue} />
        ) : (
          <Button text="Get Started" action={() => setValue((prev) => prev + 1)} />
        )
      }
    </div>
  );
};


const FirstRemark = ({ setValue, value, maxValue }) => {
  return (
    <SimpleCard>
        <div className="flex flex-col items-center">
            <TextDesc
              title="Getting"
              htitle="Started"
              desc="On behalf of the Victory Band, let me welcome you to this platform. We are excited to have you on board!"
            />
            <ButtonChooser setValue={setValue} value={value} maxValue={maxValue} />
        </div>
    </SimpleCard>
  );
};

const SecondRemark = ({ setValue, value, maxValue }) => {
  return (
    <SimpleCard>
        <div className="flex flex-col items-center">
            <h1 className="text-4xl text-gray-500 font-bold font-lora text-center ">
                Introduction
            </h1>
            <p className="text-gray-600 text-lg mt-4 px-6 text-justify max-w-xl font-roboto">
                This platform is designed to help the <span className="font-bold text-emerald-500">Victory Band</span> to track their members, manage schedules, and facilitate communication.
            </p>
            <p className="text-gray-600 text-lg mt-4 px-6 text-justify max-w-xl font-roboto">
                We are committed to providing you with the best tools and resources to enhance your musical journey. 
                Please, show your talent and feel free to sing to the Lord.
            </p>
            <ButtonChooser setValue={setValue} value={value} maxValue={maxValue} />
        </div>
    </SimpleCard>
  );
};

const ThirdRemark = ({ setValue, value, maxValue }) => {
  return (
    <SimpleCard>
        <div className="flex flex-col items-center">
            <TextDesc
              title=""
              htitle="Lastly"
              desc="Join as many groups (e.g., vocal, instrumental) as you can to enhance your musical experience and always 
                remember to leave your honest feedback and ideas."
            />
            <ButtonChooser setValue={setValue} value={value} maxValue={maxValue} />
        </div>
    </SimpleCard>
  );
};
