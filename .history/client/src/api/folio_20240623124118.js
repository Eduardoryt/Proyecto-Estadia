//Esta es mi axios personalizada
import axios from "./axios";

export const getfolioInterno = async () => axios.get(`/folio/ultimo-folio-counter`);

export const getfolioInternoInforme = async () => axios.get(`/ultimo-folio-counter-informe`);
