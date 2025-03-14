'use client'
import {useCallback, useEffect, useState} from "react";
import {Doubledamagefrom, IPokemonItem, IPokemonList, IPokemonType, ITypes, ITypesItem} from "@/app/types";
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";

export default function World() {

  // other useful hooks
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // state
  const [loading, setLoading] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [types, setTypes] = useState<ITypesItem[]>([]);
  const [pokemonList, setPokemonList] = useState<IPokemonItem[]>([]);
  
  // computed
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  const type: string | null = searchParams.get('type'); // 格式：type1,type2,type3...
  const typesInUrl: string[] = !!type ? type.split(',') : [];

  // consts
  const LIMIT = 24; // 每页显示的数量

  // 方法
  const getList: () => Promise<void> = async () => {
    if (typesInUrl.length > 0) {
      // https://pokeapi.co/api/v2/type/{type}
      const reqs: Promise<Response>[] = typesInUrl.map((type) => fetch(`https://pokeapi.co/api/v2/type/${type}`));
      const resps: Response[] = await Promise.all(reqs);
      const jsons: IPokemonType[] = await Promise.all(resps.map((res) => res.json()));
      const typeArr: Doubledamagefrom[][] = jsons.map(o => o.pokemon.map(o => o.pokemon));
      const nameArr: string[][] = typeArr.map(o => o.map(o => o.name));
      // 取几个type重叠部分的pokemon
      const result: IPokemonItem[] = [];
      typeArr.forEach(o => {
        o.forEach(p => {
          if (nameArr.every(arr => arr.includes(p.name)) && result.every(o => o.name !== p.name)) {
            result.push(p);
          }
        })
      });
      const resultPagination: IPokemonItem[] = result.slice((page - 1) * LIMIT, page * LIMIT);
      setMatchCount(result.length);
      setPokemonList(resultPagination);
      // get count only
      const res1 = await fetch( 'https://pokeapi.co/api/v2/pokemon');
      const result1: IPokemonList = await res1.json();
      setTotalCount(result1.count);
    } else {
      // 'https://pokeapi.co/api/v2/pokemon?limit=24&offset=0'
      const res = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${(page - 1) * LIMIT}`);
      const result: IPokemonList = await res.json();
      const { count, results } = result;
      setMatchCount(count);
      setPokemonList(results);
      setTotalCount(count);
    }
  };

  const getTypes: () => Promise<void> = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/type');
    const result: ITypes = await res.json();
    const { results } = result;
    setTypes(results);
  }

  const createQueryString = useCallback(
    (obj: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(obj).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })

      return params.toString()
    },
    [searchParams]
  )

  const onClickType = (type: string) => {
    const newType: string = typesInUrl.includes(type) ? typesInUrl.filter(o => o !== type).join(',') : [...typesInUrl, type].join(',');
    window.location.href = pathname + '?' + createQueryString({
      type: newType,
      page: '1'
    });
  }

  // hooks
  useEffect(() => {
    if (typeof window === "undefined") return;
    (async () => {
      setLoading(true);
      await getList();
      await getTypes();
      setLoading(false);
    })();
  }, [page])


  return (
    <div>
      <div className="flex justify-center w-full">欢迎来到宝可梦世界</div>
      <div className="p-10">
        <div>
          宝可梦总数量：{loading ? '正在加载...' : totalCount}
        </div>
        <div>
          匹配条件的宝可梦数量：{loading ? '正在加载...' : matchCount}
        </div>
        <div className="flex items-center flex-wrap">
          类型：{loading ? '正在加载...' : types.map((type) => (
          <button
            className={"pokemon-type-list-item-btn" + (typesInUrl.includes(type.name) ? ' active' : '')}
            key={type.name}
            onClick={() => onClickType(type.name)}
          >
            {type.name}
          </button>
        ))}
        </div>
        <div className="pokemon-list mt-4">
          {loading ? '正在加载...' : !pokemonList.length ? '没有数据...' : pokemonList.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-item">
              <div className="pokemon-name">
                {pokemon.name}
              </div>
              <img
                className="w-20 h-20"
                loading="lazy"
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.url.split('/').filter(Boolean).pop()}.gif`}
              />
              <div className="pokemon-id">
                编号：{pokemon.url.split('/').filter(Boolean).pop()}
              </div>
            </div>
          ))}
        </div>
        <div className="pokemon-pagination">
          { page > 1 && (
            <Link
              className="pokemon-pagination-btn"
              href={pathname + '?' + createQueryString({ page: (page - 1).toString() })}
            >
              前一页
            </Link>
          )}
          { page * 24 < matchCount &&
            (
              <Link
                className="pokemon-pagination-btn"
                href={pathname + '?' + createQueryString({ page: (page + 1).toString() })}
              >
                后一页
              </Link>
            )}
        </div>
      </div>
    </div>
  )
}