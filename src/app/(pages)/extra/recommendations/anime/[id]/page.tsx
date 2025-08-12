import React from "react";

const AnimeInfoPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default AnimeInfoPage;
