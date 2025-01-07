import Link from "next/link"

const email = "imperiano.cn@gmail.com"
const subject = "Solicitação de acesso ao App do Spotify"
const body =
  "Ola, gostaria de solicitar acesso ao app do Spotify, segue meu email de cadastro: "
const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export const WarningUnauthorizedContent = () => {
  return (
    <div className="w-full flex justify-center h-full items-center text-neutral-white-0">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Não foi possível carregar informações do usuário
        </h1>
        <p>
          Esse app está no modo de desenvolvimento, por isso o Spotify não
          permite que usuários que não estejam cadastrados no painel dessa
          aplicação acessem suas informações{" "}
        </p>
        <p>
          Você precisa solicitar permissão através do email{" "}
          <Link
            className="font-semibold text-neutral-white-0 hover:underline"
            target="__blank"
            href={mailtoHref}
          >
            imperiano.cn@gmail.com
          </Link>{" "}
          informando o e-mail da sua conta do Spotify para cadastrarmos no
          painel do app manualmente. Para mais informações sobre as limitações
          do modo de desenvolvedor acesse a{" "}
          <Link
            className="font-semibold text-neutral-white-0 hover:underline"
            target="__blank"
            href={
              "https://developer.spotify.com/documentation/web-api/concepts/quota-modes"
            }
          >
            documentação do Spotify
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
