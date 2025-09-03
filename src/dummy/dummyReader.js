// src/dummy/dummyReader.js
import team from "./team.json";
import events from "./events.json";
import modules from "./modules.json";
import speakers from "./Speakers.json";
import partners from "./partners.json";
import config from "./config.json";
import featureevents from "./featureevents.json";
import featuremodules from "./featuremodules.json";

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

  // Modules
  getModules: () => modules ?? [],
  getModule: (id) => modules.find((e) => e.id === id),
  getCustomModules: () => modules.filter((e) => e.type === "custom"),
  getFeatureModules: () => {
    const item = featuremodules.find((f) => f.id === "data");
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
    return config.map((item) => {
      const { id, ...rest } = item
      return { name: id, data: rest }
    })
  },
};
