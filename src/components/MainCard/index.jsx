function MainCard({ children }) {
    return (
        <div className="block max-w p-6 bg-backAdmin-light dark:bg-backAdmin-dark text-textAdmin-light dark:text-secondTextAdmin-light rounded">
            {children}
        </div>
    );
}

export default MainCard;
