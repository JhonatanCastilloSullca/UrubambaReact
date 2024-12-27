const VerticalTextBox = ({ topText, mainText, bottomText }) => (
    <div className="flex flex-col">
        <div className="h-7 bg-blue-400 text-center">
            {topText}
        </div>
        <div className="h-48 bg-cyan-600 text-vertical rotate-180 text-center flex justify-center items-center">
            {mainText}
        </div>
        <div className="h-7 bg-white text-center">
            {bottomText}
        </div>
    </div>
);
export default VerticalTextBox;

