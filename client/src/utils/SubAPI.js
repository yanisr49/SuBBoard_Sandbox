import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
    addSub: function(email, name, note, webSiteLink, startDate, endDate, frequency, price, promotion, startPromotion, endPromotion, promotionPrice) {
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
            promotion,
            startPromotion,
            endPromotion,
            promotionPrice
        },
        {
          headers: headers
        }
      );
    }
}