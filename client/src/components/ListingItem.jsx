import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://ysac.ca/wp-content/uploads/2023/06/Illustration-House-investment-growth-Real-estate-Property-value.webp"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.street}, {listing.city}, {listing.state} -{" "}
              {listing.pincode}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="mt-2 text-slate-500 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            {listing.propertyType === "Residential" && (
              <>
                <div className=" font-bold text-xs">
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </div>
                <div className=" font-bold text-xs">
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
