import { useEffect, useState } from "react";
import { social } from "../data/social.ts";
import DevTreeInput from "../components/DevTreeInput.tsx";
import { DevTreeLink, SocialNetwork, User } from "../types/index.ts";
import { isValidUrl } from "../utils/index.ts";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSocialLinks } from "../api/DevTreeApi.ts";

function LinkTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState<DevTreeLink[]>(social);

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>(["user"])!;

    useEffect(() => {
        const updatedData = devTreeLinks.map((item) => {
            const userLink = JSON.parse(user.links).find(
                (link: SocialNetwork) => link.name === item.name
            );

            if (userLink) {
                return {
                    ...item,
                    enabled: userLink.enabled,
                    url: userLink.url,
                };
            }
            return item;
        });
        setDevTreeLinks(updatedData);
    }, []);

    const { mutate } = useMutation({
        mutationFn: uploadSocialLinks,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (message: string) => {
            toast.success(message);
        },
    });

    const links : SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map(link => {
       if(link.name === socialNetwork ) {
          if(isValidUrl(link.url)) {
            return {...link, enabled: !link.enabled }
          } else {
            toast.error('URL no Válida')
          }
       }
       return link
    })

    setDevTreeLinks(updatedLinks)

    let updatedItems: SocialNetwork[] = []
    const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
    if(selectedSocialNetwork?.enabled) {
      const id = links.filter(link => link.id).length + 1
      if(links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if( link.name === socialNetwork ) {
            return {
              ...link,
              enabled: true,
              id
            }
          } else {
            return link
          }
        })
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id
        }
        updatedItems = [...links, newItem]
      }
    } else {
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
      updatedItems = links.map(link => {
        if(link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1
          }
        } else {
          return link
        }
      })
    } 

    // Almacenar en la base de datos
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
      }
    })
  }

    const handleUrlChange = (
        name: DevTreeLink["name"],
        url: DevTreeLink["url"]
    ) => {
        const updatedLinks = devTreeLinks.map((item) =>
            item.name === name ? { ...item, url: url } : item
        );
        setDevTreeLinks(updatedLinks);
    };

    return (
        <>
            <div className="space-y-5">
                {devTreeLinks.map((item) => (
                    <DevTreeInput
                        key={item.name}
                        item={item}
                        handleEnableLink={handleEnableLink}
                        handleUrlChange={handleUrlChange}
                    />
                ))}
                <button
                    className="bg-cyan-300 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-400 transition-colors"
                    onClick={() => mutate(user.links)}
                >
                    Guardar Cambios
                </button>
            </div>
        </>
    );
}

export default LinkTreeView;
