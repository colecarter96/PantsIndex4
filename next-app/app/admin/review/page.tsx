import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AdminReviewForm from "@/app/components/AdminReviewForm";

const SubmitPants = () => {
  return (
    <>
      <Header />
      <AdminReviewForm /> {/* Client component handling form state */}
      <Footer />
    </>
  );
};

export default SubmitPants;
