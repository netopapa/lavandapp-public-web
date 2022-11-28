// import "./email-confirmation-feedback-styles.scss";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import checkEmailRequest from "../../api/check-email-request";
import { CheckEmailResponseDTO } from "../../api/dto/check-email-response.dto";
import { Loading } from "../../components/loading";

type EmailConfirmationFeedbackState = {
  checkEmailResponse?: CheckEmailResponseDTO;
  loading?: boolean;
  error?: boolean;
};

export const EmailConfirmationFeedback = () => {
  const isMobile = window.innerWidth < 700;
  const [state, setState] = useState<EmailConfirmationFeedbackState>({});
  const { code, type } = useParams();

  const checkEmail = async () => {
    if (code) {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const checkEmailResponse = await checkEmailRequest(code, type as any);
        setState((prev) => ({ ...prev, checkEmailResponse }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: true }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  };

  useEffect(() => {
    checkEmail();
  }, []);

  const shortName = useMemo(() => {
    if (!state.checkEmailResponse) return null;

    const name =
      state.checkEmailResponse.name ?? state.checkEmailResponse.ownerName;
    if (state.checkEmailResponse.name.split(" ").length === 1)
      return state.checkEmailResponse.name;

    const broke = state.checkEmailResponse.name.split(" ");
    return `${broke[0]} ${broke[broke.length - 1]}`;
  }, [state.checkEmailResponse]);

  return (
    <div>
      {state.loading && <Loading />}
      {state.error && (
        <>
          <div
            style={{
              backgroundColor: "#de4545",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Erro ao validar email :(
            </h1>
          </div>
        </>
      )}

      {state.checkEmailResponse && (
        <>
          <div
            style={{
              backgroundColor: "#99bad7",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "0 5% 0 5%",
              }}
            >
              <h1 style={{ color: "#fff" }}>
                Parabéns, <br /> <small>{shortName}!</small>
              </h1>
              {!isMobile && (
                <img
                  src="/src/assets/medal-star.png"
                  alt="medalha"
                  width="184px"
                />
              )}
            </div>

            <p
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: "2em",
                marginTop: "15%",
              }}
            >
              Email foi validado com sucesso. Sua solicitação para cadastro na
              plataforma Lavandapp já está em análise :)
            </p>
            <p style={{ color: "#fff", textAlign: "center", fontSize: "2em" }}>
              Aguarde instruções via email em breve.
            </p>

            {isMobile && (
              <img
                src="/src/assets/medal-star.png"
                alt="medalha"
                width="80px"
                style={{ margin: "0 auto" }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
