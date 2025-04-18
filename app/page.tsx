import { LandingPage } from "@/components/landing-page"
import { getCourses } from "@/lib/actions/data-actions";

export default  async function HomePage() {
  const { courses } = await getCourses({
    limit: 4,
  });
  return (
    <>
      <LandingPage courses={courses} />
    </>
  );
}
