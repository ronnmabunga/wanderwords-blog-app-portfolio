export default function AppSpinner() {
    return (
        <div className="spinner-overlay">
            <span className="visually-hidden">Loading...</span>
            <img src={`${process.env.PUBLIC_URL}/images/custom-spinner.png`} alt="Loading" className="custom-spinner" />
        </div>
    );
}
