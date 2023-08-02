import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SAVESHIPPINGINFO } from "../../REDUX/actions/cartAction";
import { MdPinDrop, MdPublic } from "react-icons/md";
import { MdHome } from "react-icons/md";
import "./Shipping.css";
import { MdLocationCity } from "react-icons/md";
// import { MdPublish } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdTransferWithinAStation } from "react-icons/md";
import { Country, State } from "country-state-city";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";

const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone No should be 10 digit");
      return;
    }
    dispatch(
      SAVESHIPPINGINFO({
        address,
        city,
        country,
        phoneNo,
        pinCode,
        state,
      })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <MetaData title="Shipping Info" />
      <CheckOutSteps activeStep={0} />
      <div className="shippingContainer">
        {
          <div className="shippingBox">
            <h2 className="Heading">Shipping Details</h2>
            <form className="shippingInfoForm" onSubmit={shippingSubmit}>
              <div>
                <MdHome />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  name="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <MdLocationCity />
                <input
                  type="text"
                  placeholder="City"
                  required
                  name="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <MdPinDrop />
                <input
                  type="text"
                  placeholder="Pincode"
                  required
                  name="Pincode"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
              <div>
                <MdPhone />
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  name="Phone Number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </div>
              <div>
                <MdPublic />
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {country && (
                <div>
                  <MdTransferWithinAStation />
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} valuen={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <input
                type="submit"
                value="Continue"
                className="ShippingBtn"
                disabled={state ? false : true}
              />
            </form>
          </div>
        }
      </div>
    </>
  );
};

export default Shipping;
