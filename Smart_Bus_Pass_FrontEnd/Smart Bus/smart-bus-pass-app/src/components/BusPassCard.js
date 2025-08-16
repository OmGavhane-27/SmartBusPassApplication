import QRCodeDisplay from "./QRCodeDisplay";
import { farePrice } from "../config/farePrice";
import { formatDate } from "../config/formatDate";

const BusPassCard = ({ pass }) => {
    return (
        <div className="bg-gray-800 text-black transition-colors duration-300 pt-2 p-4 rounded-xl shadow-lg border hover:scale-[1.02] transform flex flex-col justify-between h-full min-h-[350px]">
           
            <div className="space-y-1 text-sm">
                <p>
                    <strong className="text-white">Pass ID:</strong> <strong className="text-white">{pass.passId}</strong>
                </p>
                <p>
                    <strong className="text-white">Type:</strong> <strong className="text-blue-500">{pass.passType}</strong>
                </p>
                <p>
                    <strong className="text-white">Status: </strong>
                    <strong className={pass.active ? "text-green-600" : "text-red-600"}>
                        {pass.active ? "Approved" : "Expired"}
                    </strong>
                </p>
                {pass.issueDate && (
                    <p className="text-white">
                        <strong className="text-white">Valid From:</strong> {formatDate(pass.issueDate)}
                    </p>
                )}
                {pass.expiryDate && (
                    <p className="text-white">
                        <strong className="text-white">Valid Until:</strong> {formatDate(pass.expiryDate)}
                    </p>
                )}
                {pass.routeSource && pass.routeDestination && (
                    <p className="text-white">
                        <strong className="text-white">Route:</strong> {pass.routeSource} to {pass.routeDestination}
                    </p>
                )}
                {pass.distanceKm > 0 && (
                    <p className="text-white">
                        <strong className="text-white">Fare Price:</strong> ₹{pass.distanceKm * farePrice}
                    </p>
                )}
            </div>
            {pass.qrCodeData && (
                <div className="w-full mt-4 flex justify-center items-end">
                    <QRCodeDisplay data={pass.qrCodeData} />
                </div>
            )}
        </div>
    );
};

export default BusPassCard;
