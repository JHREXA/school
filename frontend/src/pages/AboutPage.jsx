// Remplace l'URL de l'image par celle que tu souhaites utiliser

export const AboutPage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>À Propos d&apos;Artigialingua</h1>
      <img
        src="../public/artigialingua.jpg"
        alt="École Artigialingua"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />
      <p>
        Artigialingua est une école de langues moderne et dynamique, dédiée à
        l&apos;enseignement des langues vivantes avec une approche innovante.
        Située en plein cœur de la ville, notre établissement propose une large
        gamme de cours adaptés aux besoins de chacun, allant des débutants aux
        niveaux avancés. Nous offrons des programmes en anglais, espagnol,
        français, allemand et bien d&apos;autres langues encore.
      </p>
      <p>
        Nos méthodes pédagogiques reposent sur des techniques
        d&apos;apprentissage interactives et immersives, favorisant une
        progression rapide et efficace. Les cours sont animés par des
        enseignants expérimentés et natifs, qui utilisent des ressources
        multimédia modernes pour rendre l&apos;apprentissage à la fois stimulant
        et agréable.
      </p>
      <p>
        En plus des cours traditionnels, Artigialingua propose des ateliers
        culturels, des échanges linguistiques et des séjours linguistiques pour
        enrichir votre expérience et vous immerger complètement dans la langue
        cible.
      </p>
      <p>
        Nous croyons fermement que l&apos;apprentissage des langues est une
        porte ouverte sur le monde. Venez découvrir Artigialingua et donner un
        coup de boost à vos compétences linguistiques dans un environnement
        accueillant et inspirant.
      </p>
    </div>
  );
};
