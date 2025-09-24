import dummyReader from "../dummy/dummyReader";
import firebase from "@/config/firebase";

// API base config (Laravel routes in routes/api.php are prefixed with /api)
const API_BASE = (process.env.VUE_APP_API_BASE_URL || "http://localhost:8000") + "/api/v1";
const USE_API = (process.env.VUE_APP_USE_API || "true").toLowerCase() === "true";

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

  // func Events (kept for compatibility where used in UI)
  getEvent: createDummyResolver(dummyReader.getEvent),
  getAllEvents: createDummyResolver(dummyReader.getEvents),
  // Use modules/featured for featured IDs to drive modules section
  getFeaturesEvents: async () => {
    if (USE_API) {
      try {
        const { data } = await fetchWrapper(`${API_BASE}/modules/featured`);
        const list = Array.isArray(data) ? data : (data?.data || []);
        const ids = list.map((m) => (typeof m === "string" ? m : m.id)).filter(Boolean);
        return { success: ids.length > 0, data: ids };
      } catch (e) {
        // API down or network error; fallback to dummy
        if (process.env.NODE_ENV !== 'production') console.debug('[appservice] getFeaturesEvents API failed', e);
      }
    }
    // Fallback to local dummy featured-event IDs
    const d = dummyReader.getFeatureEvents();
    return { success: !!d && d.length > 0, data: d };
  },
  // Align custom events to modules list for current UI usage
  getAllCustomEvents: async () => {
    if (USE_API) {
      try {
        const { data } = await fetchWrapper(`${API_BASE}/modules`);
        const list = Array.isArray(data) ? data : (data?.data || []);
        return { success: Array.isArray(list), data: list.map((m) => ({ visible: true, ...m })) };
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.debug('[appservice] getAllCustomEvents API failed', e);
      }
    }
    const d = dummyReader.getEvents();
    return { success: !!d && d.length > 0, data: d };
  },

  // func Modules
  getModule: createDummyResolver(dummyReader.getModule),
  // List all modules (fallback to dummy when API unavailable)
  getAllModules: async () => {
    if (USE_API) {
      try {
        const { data } = await fetchWrapper(`${API_BASE}/modules`);
        const list = Array.isArray(data) ? data : (data?.data || []);
        return { success: Array.isArray(list), data: list.map((m) => ({ visible: true, ...m })) };
      } catch (_) {
        // fall through to dummy
      }
    }
    const d = dummyReader.getModules();
    return { success: !!d && d.length > 0, data: d };
  },
  // Featured modules (maps to /modules/featured). If API returns objects, extract IDs to keep current UI flow.
  getFeaturesModules: async () => {
    if (USE_API) {
      try {
        const { data } = await fetchWrapper(`${API_BASE}/modules/featured`);
        const list = Array.isArray(data) ? data : (data?.data || []);
        // Keep current contract flexible: return array of IDs when objects provided
        const ids = list.map((m) => (typeof m === "string" ? m : m.id)).filter(Boolean);
        return { success: ids.length > 0, data: ids };
      } catch (_) {
        // fall through to dummy
      }
    }
    const d = dummyReader.getFeatureModules();
    return { success: !!d && d.length > 0, data: d };
  },
  // Historically used by modules pages; align it to modules list
  getAllCustomModules: async () => {
    // Alias to getAllModules for now
    return appservice.getAllModules();
  },

  // Speakers
  getAllSpeakers: async () => {
    if (USE_API) {
      try {
        const { data } = await fetchWrapper(`${API_BASE}/speakers`);
        const list = Array.isArray(data) ? data : (data?.data || []);
        return { success: Array.isArray(list), data: list.map((s) => ({ visible: true, ...s })) };
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.debug('[appservice] getAllSpeakers API failed', e);
      }
    }
    const d = dummyReader.getSpeakers();
    return { success: !!d && d.length > 0, data: d };
  },
  getSpeaker: createDummyResolver(dummyReader.getSpeaker),

  // Partners
  getAllPartners: async () => {
    if (USE_API) {
      try {
        const { data } = await fetchWrapper(`${API_BASE}/partners`);
        const list = Array.isArray(data) ? data : (data?.data || []);
        return { success: Array.isArray(list), data: list.map((p) => ({ visible: true, ...p })) };
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.debug('[appservice] getAllPartners API failed', e);
      }
    }
    const d = dummyReader.getPartners();
    return { success: !!d && d.length > 0, data: d };
  },
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
