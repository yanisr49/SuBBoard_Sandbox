import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
    addSub: function(email, name, note, webSiteLink, startDate, endDate, frequency, price, promotion) {
      return axios.post(
        `${burl}/subscription/add`,
        {
            email,
            name,
            note,
            webSiteLink,
            startDate,
            endDate,
            frequency,
            price,
            promotion
        },
        {
          headers: headers
        }
      );
    },

    getSubs: function(email) {
      return axios.post(
        `${burl}/subscription/getAll`,
        {
          email
        },
        {
          headers: headers
        }
      );
    },

    getSub: function(email, name) {
      return axios.post(
        `${burl}/subscription/getAll`,
        {
          email,
          name
        },
        {
          headers: headers
        }
      );
    }
}