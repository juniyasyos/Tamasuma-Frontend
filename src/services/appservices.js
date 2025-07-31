import dummyReader from "../dummy/dummyReader";
import firebase from "@/config/firebase";

// 🔧 Utility: Untuk data dummy
const createDummyResolver = (fn) => async (...args) => {
  const data = fn(...args);
  return {
    success: !!data && (Array.isArray(data) ? data.length > 0 : true),
    data: data || (Array.isArray(data) ? [] : {}),
  };
};

// 🔧 Utility: Untuk fetch API eksternal
const fetchWrapper = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    return Promise.reject(e);
  }
};

const appservice = {
  // Dummy Readers
  getTeam: createDummyResolver(dummyReader.getTeam),
  getTeamMember: async (id) => {
    const team = dummyReader.getTeam();
    const member = team.find((item) => item.id === id);
    return {
      success: !!member,
      data: member || {},
    };
  },
  getEvent: createDummyResolver(dummyReader.getEvent),
  getAllEvents: createDummyResolver(dummyReader.getEvents),
  getFeaturesEvents: createDummyResolver(dummyReader.getFeatureEvents),
  getAllCustomEvents: createDummyResolver(dummyReader.getEvents),
  getAllSpeakers: createDummyResolver(dummyReader.getSpeakers),
  getSpeaker: createDummyResolver(dummyReader.getSpeaker),
  getAllPartners: createDummyResolver(dummyReader.getPartners),
  getPartner: async (id) => {
    const partners = dummyReader.getPartners();
    const partner = partners.find((p) => p.id === id);
    return {
      success: !!partner,
      data: partner || {},
    };
  },
  getAllConfig: async () => {
    const config = dummyReader.getConfig();
    return {
      success: !!config && config.length > 0,
      data: config || [],
    };
  },

  // External API Calls
  getAllUpcomingMeetupsEvents: (id) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${id}/events?&sign=true`;
    return fetchWrapper(url);
  },
  getAllMeetupPastEvents: (id) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${id}/events?desc=true&photo-host=public&page=300&status=past&sign=true`;
    return fetchWrapper(url);
  },
  getAllMediumBlogs: (id) => {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${id}`;
    return fetchWrapper(url);
  },

  // Firestore
  getCommunityGuidelines: async () => {
    try {
      const doc = await firebase.firestore
        .collection("config")
        .doc("communityguidelines")
        .get();

      const data = doc.data();
      return {
        success: !!data && Object.keys(data).length > 0,
        data: data || {},
      };
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export default appservice;
