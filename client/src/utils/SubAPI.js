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
        `${burl}/subscription/get`,
        {
          email,
          name
        },
        {
          headers: headers
        }
      );
    },

    deleteSub: function(email, name) {
      return axios.post(
        `${burl}/subscription/del`,
        {
          email,
          name
        },
        {
          headers: headers
        }
      );
    },

    deletePeriod: function(id) {
      return axios.post(
        `${burl}/period/del`,
        {
          id
        },
        {
          headers: headers
        }
      );
    },

    addPeriod: function(idSub, start, end, price,frequency, isPromotion) {
      return axios.post(
        `${burl}/period/addPeriod`,
        {
          idSub, 
          start, 
          end, 
          price,
          frequency, 
          isPromotion
        },
        {
          headers: headers
        }
      );
    }
}