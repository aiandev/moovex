import router from "../router";

class Helper
{
    regenerateToken (): void  {
        localStorage.clear();
        router.push("/login");
    }
}


export default new Helper();