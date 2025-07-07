import dummyReader from "../dummy/dummyReader";
import firebase from "@/config/firebase";

let appservice = {
  getTeam: () => {
    return new Promise((resolve) => {
      const team = dummyReader.getTeam();
      resolve({
        success: true,
        data: team,
      });
    });
  },

  getTeamMember: (id) => {
    return new Promise((resolve) => {
      const team = dummyReader.getTeam();
      const member = team.find((item) => item.id === id);
      resolve({
        success: !!member,
        data: member || {},
      });
    });
  },

  getAllEvents: () => {
    return new Promise((resolve) => {
      const events = dummyReader.getEvents();
      resolve({
        success: true,
        data: events,
      });
    });
  },

  getAllCustomEvents: () => {
    return new Promise((resolve) => {
      const events = dummyReader.getEvents(); // gunakan yang sama dulu
      resolve({
        success: true,
        data: events,
      });
    });
  },

  getEvent: (id) => {
    return new Promise((resolve) => {
      const event = dummyReader.getEvent(id);
      resolve({
        success: !!event,
        data: event || {},
      });
    });
  },

  getAllSpeakers: () => {
    return new Promise((resolve) => {
      const speakers = dummyReader.getSpeakers();
      resolve({
        success: true,
        data: speakers,
      });
    });
  },

  getSpeaker: (id) => {
    return new Promise((resolve) => {
      const speaker = dummyReader.getSpeaker(id);
      resolve({
        success: !!speaker,
        data: speaker || {},
      });
    });
  },

  getFeaturesEvents: () => {
    return new Promise((resolve, reject) => {
      try {
        const item = dummyReader.getFeatureEvents();
        if (!item || item.length === 0) {
          resolve({
            success: false,
            data: {},
          });
        } else {
          resolve({
            success: true,
            data: item,
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },

  getAllPartners: () => {
    return new Promise((resolve) => {
      const partners = dummyReader.getPartners();
      resolve({
        success: true,
        data: partners,
      });
    });
  },

  getPartner: (id) => {
    return new Promise((resolve) => {
      const partners = dummyReader.getPartners();
      const partner = partners.find((p) => p.id === id);
      resolve({
        success: !!partner,
        data: partner || {},
      });
    });
  },

  getAllConfig: () => {
    return new Promise((resolve) => {
      const config = dummyReader.getConfig(); // Sudah dalam bentuk array [{ name, data }]
      if (!config || config.length === 0) {
        resolve({
          success: false,
          data: [],
        });
      } else {
        resolve({
          success: true,
          data: config,
        });
      }
    });
  },

  getAllUpcomingMeetupsEvents: (id) => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://cors-anywhere.herokuapp.com/https://api.meetup.com/" +
          id +
          "/events?&sign=true"
      )
        .then((res) => res.json())
        .then((data) => {
          resolve({
            success: true,
            data: data,
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getCommunityGuidelines: () => {
    return new Promise((resolve, reject) => {
      firebase.firestore
        .collection("config")
        .doc("communityguidelines")
        .get()
        .then((doc) => {
          if (doc.empty) {
            resolve({
              success: false,
              data: {},
            });
          }
          if (Object.keys(doc.data()).length > 0) {
            resolve({
              success: true,
              data: doc.data(),
            });
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getAllMeetupPastEvents: (id) => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://cors-anywhere.herokuapp.com/https://api.meetup.com/" +
          id +
          "/events?desc=true&photo-host=public&page=300&status=past&sign=true"
      )
        .then((res) => res.json())
        .then((data) => {
          resolve({
            success: true,
            data: data,
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getAllMediumBlogs: (id) => {
    return new Promise((resolve, reject) => {
      let baseURL =
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/" +
        id;

      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.length > 0) {
            resolve({
              success: true,
              data: data,
            });
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export default appservice;
