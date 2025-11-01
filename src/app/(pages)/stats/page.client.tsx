import GitHubCalendar from "react-github-calendar";

const ClientStatsPage = () => {
  return (
    <div>
      <div className="flex justify-center my-6">
        <div className="flex justify-center py-10">
          <GitHubCalendar
            username="renskiedulog"
            colorScheme="light"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientStatsPage;
