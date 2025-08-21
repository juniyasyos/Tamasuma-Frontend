import dummyReader from "../dummy/dummyReader";
import firebase from "@/config/firebase";

const API_BASE = "http://127.0.0.1:8000";

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

// 🔧 Utility: Fetch API lokal dengan fallback dummy
const fetchWithDummyFallback = async (endpoint, dummyFn) => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return {
      success: !!data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0),
      data,
    };
  } catch (e) {
    const data = dummyFn();
    return {
      success: !!data && (Array.isArray(data) ? data.length > 0 : true),
      data: data || (Array.isArray(data) ? [] : {}),
    };
  }
};

const appservice = {
  // API dengan fallback dummy
  getTeam: () => fetchWithDummyFallback("/team", dummyReader.getTeam),
  getTeamMember: async (id) =>
    fetchWithDummyFallback(`/team/${id}`, () => dummyReader.getTeamMember(id)),
  getEvent: (id) =>
    fetchWithDummyFallback(`/events/${id}`, () => dummyReader.getEvent(id)),
  getAllEvents: () => fetchWithDummyFallback("/events", dummyReader.getEvents),
  getFeaturesEvents: () =>
    fetchWithDummyFallback("/featureevents", dummyReader.getFeatureEvents),
  getAllCustomEvents: async () => {
    const res = await fetchWithDummyFallback("/events", dummyReader.getEvents);
    if (res.success) res.data = res.data.filter((e) => e.type === "custom");
    return res;
  },
  getAllSpeakers: () =>
    fetchWithDummyFallback("/Speakers", dummyReader.getSpeakers),
  getSpeaker: (id) =>
    fetchWithDummyFallback(`/Speakers/${id}`, () => dummyReader.getSpeaker(id)),
  getAllPartners: () =>
    fetchWithDummyFallback("/partners", dummyReader.getPartners),
  getPartner: (id) =>
    fetchWithDummyFallback(`/partners/${id}`, () => dummyReader.getPartner(id)),
  getAllConfig: () => fetchWithDummyFallback("/config", dummyReader.getConfig),

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
