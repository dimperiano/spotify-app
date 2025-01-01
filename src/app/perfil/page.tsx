'use client'

import React from 'react';
import useUserProfile from '@/hooks/useUserProfile';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';

const UserProfile = () => {
    const { data, isLoading, error } = useUserProfile();
    const email = 'imperiano.cn@gmail.com';
    const subject = 'Solicitação de acesso ao APP do spotify';
    const body = 'Ola, gostaria de solicitar acesso ao app do spotify, segue meu email de cadastro: ';

    const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (isLoading) return <p>Loading user profile...</p>;
    if (error) return (
        <div className='w-full h-screen flex justify-center items-center text-neutral-white-0 bg-neutral-black-10'>
            <div className='text-center max-w-2xl mx-auto'>
                <h1 className='text-2xl font-bold mb-4'>Não foi possível carregar informações do usuário</h1>
                <p>Esse app está no modo de desenvolvimento por isso o spotify não permite que usuários que não estejam cadastrados no painel acessem suas informações </p>
                <p>Você precisa solicitar permissão através do email <Link className='font-semibold text-neutral-white-0 hover:underline' target='__blank' href={mailtoHref}> imperiano.cn@gmail.com </Link>  informando o e-mail da sua conta do spotify para cadastrarmos no painel do app manualmente. Para mais informações sobre as limitações do modo de desenvolvedor <Link className='font-semibold text-neutral-white-0 hover:underline' target='__blank' href={'https://developer.spotify.com/documentation/web-api/concepts/quota-modes'}>Clique aqui</Link>.</p>
            </div>
        </div>
    )

    return (
        <div className='h-screen w-full flex items-center justify-center flex-col gap-6'>

            <Image className='rounded-[64px]' src={data?.images[0].url} alt={data?.display_name} width={128} height={128} />
            <h1 className='text-2xl leading-5 font-medium'>{data?.display_name}</h1>
            <LogoutButton />
        </div>
    );
};

export default UserProfile;