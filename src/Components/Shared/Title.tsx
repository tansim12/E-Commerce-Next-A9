import { ITitle } from "@/src/Types";


const Title = ({ additionalText, mainText, children }: ITitle) => {
  return (
    <div>
      <div className="text-center">
        <div className="flex justify-center items-center gap-2">
          <p className="font-bold text-2xl md:text-4xl mb-2">{mainText}</p>
          {children && children}
        </div>
        <p>{additionalText}</p>
      </div>
    </div>
  );
};

export default Title;
