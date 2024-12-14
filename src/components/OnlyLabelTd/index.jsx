const OnlyLabelTd = ({ rowspan = 1, colspan = 1, label = '', orientation = 'horizontal' }) => {
    const isVertical = orientation === 'vertical';

    return (
        <td
            rowSpan={rowspan}
            colSpan={colspan}
            className={`p-0 border border-gray-300 text-xs ${isVertical ? 'w-8 min-w-8 max-w-8 align-middle text-vertical rotate-180' : ''}`}
        >
            <div className="p-0 m-0">
                {label}
            </div>
        </td>
    );
};
export default OnlyLabelTd;
