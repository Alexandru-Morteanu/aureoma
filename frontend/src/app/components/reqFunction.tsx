import { FilterSchema, PRET_ARGINT, PRET_AUR } from "../../../constants";
import { supabase } from "./supabase";

type Props = {
  articol: string;
  filterData: FilterSchema;
  sortData: string;
  pageNumber: number;
};
export default async function reqSupabase({
  articol,
  filterData,
  sortData,
  pageNumber,
}: Props) {
  const filteredReq: any = supabase
    .rpc("filter", {
      aur_value: PRET_AUR,
      argint_value: PRET_ARGINT,
      article: articol,
    })
    .lte(
      "pret",
      filterData.pret.max === undefined
        ? Number.MAX_SAFE_INTEGER
        : filterData.pret.max
    )
    .gte("pret", filterData.pret.min === undefined ? 0 : filterData.pret.min)
    .lte(
      "greutate",
      filterData.greutate.max === undefined
        ? Number.MAX_SAFE_INTEGER
        : filterData.greutate.max
    )
    .gte(
      "greutate",
      filterData.greutate.min === undefined ? 0 : filterData.greutate.min
    );

  if (!filterData.material.aur && filterData.material.argint) {
    filteredReq.eq("category", "Argint");
  } else if (filterData.material.aur && !filterData.material.argint) {
    filteredReq.eq("category", "Aur");
  }

  if (filterData.marime) {
    console.log(filterData.marime);
    const trueMarimeKeys = Object.keys(filterData.marime ?? {}).filter(
      (key) => filterData.marime?.[key]
    );
    console.log(trueMarimeKeys);
    if (trueMarimeKeys.length > 0) {
      filteredReq.in("marime", trueMarimeKeys);
    }
  }
  const trueKeys = [];
  for (const key in filterData.model) {
    if (filterData.model[key] === true) {
      trueKeys.push(key);
    }
  }
  if (filterData.model["Inel"] !== undefined) {
    if (trueKeys.length > 0) {
      filteredReq.in("articol", trueKeys);
    }
  } else {
    if (trueKeys.length > 0) {
      filteredReq.in("model", trueKeys);
    }
  }

  let stop = false;
  filteredReq.range((pageNumber - 1) * 3, pageNumber * 3 - 1);

  switch (sortData) {
    case "PretCresc":
      filteredReq.order("pret", { ascending: true });
      break;
    case "PretDesc":
      filteredReq.order("pret", { ascending: false });
      break;
    case "GreutateCresc":
      filteredReq.order("greutate", { ascending: true });
      break;
    case "GreutateDesc":
      filteredReq.order("greutate", { ascending: false });
      break;
    case "MarimeCresc":
      filteredReq.order("marime", { ascending: true });
      break;
    case "MarimeDesc":
      filteredReq.order("marime", { ascending: false });
      break;
    default:
      filteredReq.order("articol", { ascending: true });
      break;
  }
  const { data, error } = await filteredReq;
  if (data.length < 1) {
    stop = true;
  }
  return { data: data, stop: stop };
}
