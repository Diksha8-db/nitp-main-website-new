// --- Helpers ---
function compact(values) {
  return values.filter(Boolean);
}

function mapPerson(person = {}) {
  return {
    name: person.name || "",
    email: person.email || "",
    phone: person.phone || "",
    department: person.department || "",
    image: person.image || "",
  };
}

function mapMember(member = {}) {
  return {
    name: member.name || "",
    image: member.image || "",
  };
}

function mapImages(images) {
  if (!Array.isArray(images)) return [];

  return compact(
    images.map((image) => {
      if (typeof image === "string") return image;

      if (image && typeof image === "object") {
        return image.url || image.src || image.logo || image.logo_url || "";
      }

      return "";
    })
  );
}

function mapSessions(sessions = []) {
  if (!Array.isArray(sessions)) return [];

  return sessions.map((session) => ({
    academicSession: session.academic_session || "",

    clubPresident: mapMember(session.club_president),
    clubSecretary: mapMember(session.club_secretary),

    patnaCampusPi: mapPerson(session.patna_campus_pi),
    bihtaCampusPi: mapPerson(session.bihta_campus_pi),
  }));
}

// --------------------
// Main Mapper
// --------------------

export function mapClubData(club = {}) {
  if (!club || typeof club !== "object" || Object.keys(club).length === 0) {
    return null;
  }

  const id = club.id;
  const slug =  club.id;
  const name = club.name || "Club";
  const logo = club.logo || "";

  const gallery = mapImages(club.pictures);

  const patnaPi = mapPerson(club.patna_campus_pi);
  const bihtaPi = mapPerson(club.bihta_campus_pi);

  const president = mapMember(club.club_president);
  const secretary = mapMember(club.club_secretary);

  return {
    ...club,
    id,
    slug,
    clubId: id,

    name,
    clubName: name,

    email: club.email || "",
    category: club.category || "",
    status: club.status || "",

    description: club.description || "",
    about: club.about || "",

    logo,
    logoUrl: logo,

    tagline: club.tagline || "",

    // Office Bearers
    president,
    presidentName: president.name,
    presidentImage: president.image,

    secretary,
    secretaryName: secretary.name,
    secretaryImage: secretary.image,

    // PI Details
    patnaPi,
    bihtaPi,

    patnaPiName: patnaPi.name,
    patnaPiEmail: patnaPi.email,
    patnaPiPhone: patnaPi.phone,
    patnaPiDepartment: patnaPi.department,
    patnaPiImage: patnaPi.image,

    bihtaPiName: bihtaPi.name,
    bihtaPiEmail: bihtaPi.email,
    bihtaPiPhone: bihtaPi.phone,
    bihtaPiDepartment: bihtaPi.department,
    bihtaPiImage: bihtaPi.image,

    // Images
    gallery,
    pictures: gallery,
    
    createdAt: club.created_at || "",
    updatedAt: club.updated_at || "",
  };
}

export function mapClubsData(clubs) {
  if (!Array.isArray(clubs)) return []
  return clubs.map(mapClubData);
}