import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const UpdateListing = lazy(() => import("./pages/UpdateListing"));
const Listing = lazy(() => import("./pages/Listing"));
const Search = lazy(() => import("./pages/Search"));

export default function App() {
  useEffect(() => {
    // const fetchTokenAndInitVoiceflow = async () => {
    //   try {
    //     const res = await fetch("/api/auth/me", {
    //       method: "GET",
    //       credentials: "include",
    //     });

    //     if (res.ok) {
    //       const data = await res.json();
    //       const token = data.token;
    //       console.log(token);

          const script = document.createElement("script");
          script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
          script.type = "text/javascript";
          script.async = true;

          script.onload = () => {

            if (window.voiceflow) {
              window.voiceflow.chat.load({
                verify: { projectID: "6814a72887a54c892142a84c" },
                url: "https://general-runtime.voiceflow.com",
                versionID: "6814a72887a54c892142a84d",  
                // launch: {event :{type: "launch", payload: {auth_token: token}}},
                assistant: {
                  persistence: "localStorage",
                },
              });
            }
          };

          document.body.appendChild(script);
    //     } else {
    //       console.log(
    //         "User not authenticated. Voiceflow loaded without token."
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Error fetching token or loading Voiceflow:", error);
    //   }
    // };
    // fetchTokenAndInitVoiceflow();

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);   

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />

          <Route path="/listing/:listingId" element={<Listing />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
