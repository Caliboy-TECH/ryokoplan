window.RyokoStorage = (() => {
  const SAVED_KEY = 'ryoko_saved_trips_v2';
  const RECENT_KEY = 'ryoko_recent_trips_v2';
  const SHARED_KEY = 'ryoko_shared_trips_v2';
  const SAVED_PLACE_PREFIX = 'ryoko:savedPlaces:';

  const read = key => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const uid = () => `trip_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

  function saveTrip(payload){
    const list = read(SAVED_KEY).filter(x => x.id !== payload.id);
    const item = {...payload, id: payload.id || uid(), savedAt: new Date().toISOString()};
    list.unshift(item);
    write(SAVED_KEY, list.slice(0, 40));
    return item;
  }
  function addRecentTrip(payload){
    const list = read(RECENT_KEY).filter(x => x.id !== payload.id);
    const item = {...payload, id: payload.id || uid(), viewedAt: new Date().toISOString()};
    list.unshift(item);
    write(RECENT_KEY, list.slice(0, 40));
    return item;
  }
  function addSharedTrip(payload){
    const list = read(SHARED_KEY).filter(x => x.id !== payload.id);
    const item = {...payload, id: payload.id || uid(), sharedViewedAt: new Date().toISOString()};
    list.unshift(item);
    write(SHARED_KEY, list.slice(0, 40));
    return item;
  }
  function getSavedTrips(){ return read(SAVED_KEY); }
  function getRecentTrips(){ return read(RECENT_KEY); }
  function getSharedTrips(){ return read(SHARED_KEY); }
  function deleteSavedTrip(id){ write(SAVED_KEY, read(SAVED_KEY).filter(x => x.id !== id)); }
  function deleteRecentTrip(id){ write(RECENT_KEY, read(RECENT_KEY).filter(x => x.id !== id)); }
  function deleteSharedTrip(id){ write(SHARED_KEY, read(SHARED_KEY).filter(x => x.id !== id)); }

  function getSavedPlaceCollections(){
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(SAVED_PLACE_PREFIX))
        .map(key => {
          const raw = key.slice(SAVED_PLACE_PREFIX.length);
          let places = [];
          try { places = JSON.parse(localStorage.getItem(key) || '[]'); } catch {}
          const city = raw.replace(/(^.|-.)/g, match => match.replace('-', '').toUpperCase());
          return { city, slug: raw, places: Array.isArray(places) ? places : [] };
        })
        .filter(entry => entry.places.length);
    } catch {
      return [];
    }
  }

  function duplicateTrip(id){
    const source = [...getSavedTrips(), ...getRecentTrips(), ...getSharedTrips()].find(x => x.id === id);
    if(!source) return null;
    return saveTrip({...source, id: uid(), title: `${source.title || source.destination} Copy`});
  }
  function encodeShare(payload){
    const json = JSON.stringify(payload);
    return btoa(unescape(encodeURIComponent(json)));
  }
  function decodeShare(encoded){
    try{ return JSON.parse(decodeURIComponent(escape(atob(encoded)))); }catch{return null;}
  }
  return {
    saveTrip,
    addRecentTrip,
    addSharedTrip,
    getSavedTrips,
    getRecentTrips,
    getSharedTrips,
    getSavedPlaceCollections,
    deleteSavedTrip,
    deleteRecentTrip,
    deleteSharedTrip,
    duplicateTrip,
    encodeShare,
    decodeShare
  };
})();
