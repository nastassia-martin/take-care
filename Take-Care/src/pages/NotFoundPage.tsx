import AccessDenied from "../components/AccessDenied/AccessDenied";

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <AccessDenied customMessage="We couldn't find the page you were looking for" />
    </div>
  );
};

export default NotFoundPage;
