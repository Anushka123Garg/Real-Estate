import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    city: "",
    propertyType: "",
    subType: "",
    subSubType: "",
    minPrice: 10000,
    maxPrice: 10000000,
    // facilities: {
    //   pool: false,
    //   playArea: false,
    //   gymnasium: false,
    //   games: false,
    // },
    parking: false,
    furnished: false,
    balcony: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  // console.log(listings);

  const subSubTypeOptions = {
    Office: [
      "Ready to Move Space",
      "Bare Shell Office Space",
      "Co-working Space",
      "Business Center",
    ],
    Retail: ["Showrooms", "Shops"],
    Land: ["Commercial Land", "Agricultural Land", "Industrial Land/ Plots"],
    Storage: ["Warehouse", "Cold Storage", "Self Storage"],
    Industry: ["Factory", "Manufacturing"],
    Hospitality: ["Hotel/ Resort", "Banquet Halls", "Guest House"],
    "Apartment/Flat": ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"],
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const cityFromUrl = urlParams.get("city");
    const propertyTypeFromUrl = urlParams.get("propertyType");
    const subTypeFromUrl = urlParams.get("subType");
    const subSubTypeFromUrl = urlParams.get("subSubType");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const balconyFromUrl = urlParams.get("balcony");
    const minPriceFromUrl = urlParams.get("minPrice");
    const maxPriceFromUrl = urlParams.get("maxPrice");
    // const poolFromUrl = urlParams.get("pool");
    // const playAreaFromUrl = urlParams.get("playArea");
    // const gymnasiumFromUrl = urlParams.get("gymnasium");
    // const gamesFromUrl = urlParams.get("games");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      cityFromUrl ||
      propertyTypeFromUrl ||
      subTypeFromUrl ||
      subSubTypeFromUrl ||
      parkingFromUrl ||
      // poolFromUrl || gymnasiumFromUrl || gamesFromUrl || playAreaFromUrl ||
      furnishedFromUrl ||
      balconyFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        city: cityFromUrl || "all",
        propertyType: propertyTypeFromUrl || "all",
        subType: subTypeFromUrl || "all",
        subSubType: subSubTypeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        minPrice: minPriceFromUrl ? Number(minPriceFromUrl) : 10000,
        maxPrice: maxPriceFromUrl ? Number(maxPriceFromUrl) : 10000000,
        balcony: balconyFromUrl === "true" ? true : false,
        // facilities: {
        //   pool: false,
        //   playArea: false,
        //   gymnasium: false,
        //   games: false,
        // },
        // facilities: {
        //   pool: poolFromUrl === "true",
        //   playArea: playAreaFromUrl === "true",
        //   gymnasium: gymnasiumFromUrl === "true",
        //   games: gamesFromUrl === "true",
        // },
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      // console.log("Search Query:", searchQuery);

      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      console.log("API Response:", data);
      console.log("Type of listings:", typeof data);

      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);

      console.log("Type off listings:", typeof data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);
  console.log(sidebardata);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (
      id === "all" || id === "rent" || id === "sale") {
      setSidebardata({ ...sidebardata, type: id });
    }
    if (id === "propertyType") {
      setSidebardata({ ...sidebardata, propertyType: value });
    }
    if (id === "subType") {
      setSidebardata({ ...sidebardata, subType: value });
    }
    if (id === "subSubType") {
      setSidebardata({ ...sidebardata, subSubType: value });
    }
    if (id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: value });
    }
    if (id === "city") {
      setSidebardata({ ...sidebardata, city: value });
    }
    if (
      id === "parking" || id === "furnished" || id === "balcony" || id === "offer") {
      setSidebardata({
        ...sidebardata,
        [id]: checked || checked === "true" ? true : false,
      });
    }
    // if (
    //   ["pool", "playArea", "gymnasium", "games"].includes(e.target.id)
    // ) {
    //   setSidebardata({
    //     ...sidebardata,
    //     facilities: {
    //       ...sidebardata.facilities,
    //       [e.target.id]: e.target.checked,
    //     },
    //   });
    // }
    if (id === "minPrice" || id === "maxPrice") {
      const priceValue = Number(value);
      setSidebardata((prev) => ({
        ...prev,
        [id]: priceValue, }));
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({
        ...sidebardata,
        sort,
        order,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("city", sidebardata.city);
    urlParams.set("propertyType", sidebardata.propertyType);
    urlParams.set("subType", sidebardata.subType);
    urlParams.set("subSubType", sidebardata.subSubType);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("balcony", sidebardata.balcony);
    urlParams.set("minPrice", sidebardata.minPrice);
    urlParams.set("maxPrice", sidebardata.maxPrice);
    // urlParams.set("pool", sidebardata.facilities.pool);
    // urlParams.set("playArea", sidebardata.facilities.playArea);
    // urlParams.set("gymnasium", sidebardata.facilities.gymnasium);
    // urlParams.set("games", sidebardata.facilities.games);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row pt-[80px]">
      <div className="p-5 border-b-2 md:border-r-2 md:min-h-screen w-full md:w-[400px]">
        <div className="lg:sticky lg:top-[90px] p-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-semibold">Property Type:</label>
              <select
                id="propertyType"
                onChange={handleChange}
                value={sidebardata.propertyType}
                className="border rounded-lg p-3"
              >
                <option value="all">All</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-semibold">Subtype:</label>
              <select
                id="subType"
                onChange={handleChange}
                value={sidebardata.subType}
                className="border rounded-lg p-3"
              >
                <option value="">All</option>
                {sidebardata.propertyType === "residential" && (
                  <>
                    <option value="Apartment/Flat">Apartment/Flat</option>
                    <option value="Villa">Independent House/ Villa</option>
                    <option value="Builder Floor">Builder Floor</option>
                    <option value="PG/Co-Living">PG/Co-Living</option>
                    <option value="1 RK/ Studio Apartment">
                      1 RK/ Studio Apartment
                    </option>
                    <option value="Serviced Apartment">
                      Serviced Apartment
                    </option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Other">Other</option>
                  </>
                )}

                {sidebardata.propertyType === "commercial" && (
                  <>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Plots/ Land">Plots/ Land</option>
                    <option value="Storage">Storage</option>
                    <option value="Industry">Industry</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
            </div>

            {subSubTypeOptions[sidebardata.subType] &&
              subSubTypeOptions[sidebardata.subType].length > 0 && (
                <div className="flex items-center gap-2">
                  <label className="font-semibold">SubSubtype:</label>
                  <select
                    id="subSubType"
                    onChange={handleChange}
                    value={sidebardata.subSubType}
                    className="border rounded-lg p-3"
                  >
                    <option value="">All</option>
                    {subSubTypeOptions[sidebardata.subType] &&
                      subSubTypeOptions[sidebardata.subType].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
              )}

            <div className="flex flex-wrap items-center gap-2">
              <label className="font-semibold">Type:</label>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                ></input>
                <span>Rent & Sale</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span>Rent</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                ></input>
                <span>Sale</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                ></input>
                <span>Offer</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">City:</label>
              <input
                type="text"
                id="city"
                placeholder="Enter city..."
                className="border rounded-lg p-3 w-full"
                value={sidebardata.city}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="font-semibold">Amenities:</label>

              {/* <div className="flex gap-2">
              <input
                type="checkbox"
                id="pool"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.facilities.pool}
              ></input>
              <span>Swimming Pool</span>
            </div> */}

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                ></input>
                <span>Parking</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                ></input>
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="balcony"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.balcony}
                ></input>
                <span>Balcony</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-semibold">
                Price Range: 
                ₹{sidebardata.minPrice.toLocaleString("en-IN")} – ₹
                {sidebardata.maxPrice.toLocaleString("en-IN")}
              </label>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="minPrice"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={sidebardata.minPrice}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <input
                  type="range"
                  id="maxPrice"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={sidebardata.maxPrice}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc"> Price high to low</option>
              <option value="regularPrice_asc"> Price low to high</option>
              <option value="createdAt_desc"> Latest</option>
              <option value="createdAt_Asc"> Oldest</option>
            </select>
          </div>

            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold brder-b p-3 text-slate-700 mt-5">
          Listing Results
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
