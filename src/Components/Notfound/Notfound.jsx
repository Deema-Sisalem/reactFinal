import NotFoundImg from "../../assets/error.svg";

function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center py-5">
      <img src={NotFoundImg} alt="404 Not Found" style={{ width: "60%", maxWidth: "60rem" }} />
      <h2 className="mt-5 font-semibold text-teal-900 text-success px-2 text-center fs-3">Couldn't find the page you're looking for!</h2>
    </section>
  );
}

export default NotFound;