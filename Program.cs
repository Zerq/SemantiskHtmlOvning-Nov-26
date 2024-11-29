using Hobby;

public class Program
{
    public static void Main(params string[] args)
    {
        if (args.Length > 0)
        {
            TsxFix.Run(args);
        }
        else
        {
            WebApp.Run();
        }
    }
}