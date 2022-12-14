import medalhaImg from '/src/assets/medal-star.png'
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import checkEmailRequest from "../../api/check-email-request";
import { CheckEmailResponseDTO } from "../../api/dto/check-email-response.dto";
import { Loading } from "../../components/loading";
import { AxiosError } from 'axios';
import { CustomError } from '../../api/dto/custom-error';

type EmailConfirmationFeedbackState = {
  checkEmailResponse?: CheckEmailResponseDTO;
  loading?: boolean;
  error?: boolean;
  errorText?: string;
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
      } catch (e) {
        setState((prev) => ({ ...prev, error: true, errorText: (e as CustomError).msg }));
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
      state.checkEmailResponse.name ?? state.checkEmailResponse.displayName;
    if (name.split(" ").length === 1) return state.checkEmailResponse.name;

    const broke = name.split(" ");
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
            {state.errorText || 'Erro ao validar email :('}
            </h1>
          </div>
        </>
      )}

      {state.checkEmailResponse && (
        <>
          <div
            style={{
              backgroundColor: "#2196f3",
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
                Parab??ns, <br /> <small>{shortName}!</small>
              </h1>
              {!isMobile && (
                <img
                  src={medalhaImg}
                  alt="medalha"
                  width="184px"
                />
              )}
            </div>

            <p
              style={{
                color: "#fff",
                margin: '0 auto',
                textAlign: "center",
                fontSize: "2em",
                marginTop: "15%",
                maxWidth: '900px'
              }}
            >
              Email foi validado com sucesso. Sua solicita????o para cadastro na
              plataforma Lavandapp j?? est?? em an??lise :)
            </p>
            <p style={{ color: "#fff", textAlign: "center", fontSize: "2em" }}>
              Aguarde instru????es via email em breve.
            </p>

            {isMobile && (
              <img
                src={medalhaImg}
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
