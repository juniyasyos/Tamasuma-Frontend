// src/dummy/dummyReader.js
import team from "./team.json";
import events from "./events.json";
import speakers from "./Speakers.json";
import partners from "./partners.json";
import config from "./config.json";
import featureevents from "./featureevents.json";

export default {
  // Team
  getTeam: () => team,
  getTeamMember: (id) => team.find((t) => t.id === id),

  // Events
  getEvents: () => events ?? [],
  getEvent: (id) => events.find((e) => e.id === id),
  getCustomEvents: () => events.filter((e) => e.type === "custom"),
  getFeatureEvents: () => {
    const item = featureevents.find((f) => f.id === "data");
    return item ? item.eventid : [];
  },

  // Speakers
  getSpeakers: () => speakers,
  getSpeaker: (id) => speakers.find((s) => s.id === id),

  // Partners
  getPartners: () => partners,
  getPartner: (id) => partners.find((p) => p.id === id),

  // Config
  getConfig: () => {
    return config.map((item) => ({
      name: item.id, 
      data: { ...item, id: undefined },
    }));
  },
};
